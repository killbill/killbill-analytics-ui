(function (d3, $, window, document, undefined) {
  function errorMessage(error) {
    if (error && error.responseText) {
      try {
        var response = JSON.parse(error.responseText);
        if (response.message) {
          return response.message;
        }
      } catch (ex) {
        return error.responseText;
      }
    }

    return error && error.message ? error.message : String(error);
  }

  function renderError(message) {
    var escapedMessage = $("<div/>").text(message).html();
    $("#chartAnchor").prepend(
      '<div class="alert alert-danger" role="alert">' + escapedMessage + "</div>"
    );
  }

  // Workaround for a MariaDB JDBC connector v3.x parser bug in the bundled
  // analytics plugin: any request that contains a `^dimension:` clause causes
  // the plugin to generate a `CASE ... END AS \`field\`` expression that the
  // driver mangles, returning a 500 ("near '' at line N").
  //
  // The same data can be obtained by issuing one `^filter:(field=value)`
  // request per dimension value and stitching the single-series payloads
  // together client-side. Filter-only requests don't trigger the bug.
  //
  // Returns an array of { path, label } objects. When no dimension is present,
  // returns a single entry with the original path and a null label.
  function expandDimensionToFilters(reportsPath) {
    var url;
    try {
      url = new URL(reportsPath, window.location.origin);
    } catch (e) {
      return [{ path: reportsPath, label: null }];
    }

    var nameParam = url.searchParams.get("name");
    if (!nameParam) {
      return [{ path: reportsPath, label: null }];
    }

    var parts = nameParam.split("^");
    var baseName = parts[0];
    var clauses = parts.slice(1);

    var dimensionField = null;
    var dimensionValues = [];
    var otherClauses = [];

    clauses.forEach(function (c) {
      var m = c.match(/^dimension:([^(]+)\(([^)]+)\)$/);
      if (m && dimensionField === null) {
        dimensionField = m[1];
        dimensionValues = m[2].split("|");
      } else {
        otherClauses.push(c);
      }
    });

    if (dimensionField === null || dimensionValues.length === 0) {
      return [{ path: reportsPath, label: null }];
    }

    // If there is also a filter on the same field (e.g. filter:(currency=USD|EUR)),
    // intersect it with the dimension values so the filter still narrows the
    // displayed series. Otherwise we'd silently re-introduce values the user
    // filtered out.
    var sameFieldFilterValues = null;
    otherClauses.forEach(function (c) {
      var fm = c.match(/^filter:\((.+)\)$/);
      if (!fm) {
        return;
      }
      // Filter syntax is repeated `field=value` pairs joined by `|`,
      // e.g. `currency=USD|currency=EUR` (NOT `currency=USD|EUR`).
      var pairs = fm[1].split("|");
      var values = [];
      var matched = false;
      for (var i = 0; i < pairs.length; i++) {
        var eq = pairs[i].indexOf("=");
        if (eq === -1) {
          continue;
        }
        var field = pairs[i].substring(0, eq);
        var value = pairs[i].substring(eq + 1);
        if (field === dimensionField) {
          matched = true;
          values.push(value);
        }
      }
      if (matched) {
        sameFieldFilterValues = (sameFieldFilterValues || []).concat(values);
      }
    });

    if (sameFieldFilterValues) {
      dimensionValues = dimensionValues.filter(function (v) {
        return sameFieldFilterValues.indexOf(v) !== -1;
      });
      if (dimensionValues.length === 0) {
        // Filter excluded every dimension value — nothing to render.
        return [];
      }
    }

    return dimensionValues.map(function (value) {
      // Drop the same-field filter clause — we replace it with a single-value
      // filter for this fan-out request. Filters on other fields are kept.
      var preservedClauses = otherClauses.filter(function (c) {
        var fm = c.match(/^filter:\((.+)\)$/);
        if (!fm) {
          return true;
        }
        return fm[1].indexOf(dimensionField + "=") === -1;
      });

      preservedClauses.push("filter:(" + dimensionField + "=" + value + ")");

      var newName = baseName + "^" + preservedClauses.join("^");
      var newUrl = new URL(url.toString());
      newUrl.searchParams.set("name", newName);

      return { path: newUrl.toString(), label: value };
    });
  }

  // Merge an array of single-series plugin responses (one per dimension value)
  // into a single multi-series payload compatible with the existing renderer.
  function mergeFanOutResults(results) {
    var firstValid = null;
    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      if (r && r.json && r.json[0]) {
        firstValid = r;
        break;
      }
    }
    if (!firstValid) {
      return null;
    }

    var merged = {
      name: firstValid.json[0].name,
      type: firstValid.json[0].type,
      data: [],
    };

    results.forEach(function (r) {
      if (!r || !r.json || !r.json[0] || !r.json[0].data) {
        return;
      }
      r.json[0].data.forEach(function (series) {
        merged.data.push({
          // Use the dimension value as the series name so the chart legend
          // distinguishes USD vs EUR vs GBP etc.
          name: r.label || series.name,
          values: series.values,
          value: series.value,
        });
      });
    });

    return merged;
  }

  function renderPayload(data) {
    var renderer = new Kiddo.Renderer("#chartAnchor");

    if (data === undefined || data.data === undefined || data.data.length == 0) {
      return renderer.noData();
    }

    try {
      switch (data.type) {
        case "COUNTERS":
          renderer.pieChart(data);  
          break;
        case "TIMELINE":
          renderer.lineChart(data);
          // Date controls only make sense for timelines
          $("#date-controls").show();
          break;
        case "TABLE":
          renderer.table(data);
          break;
        default:
          console.log("No such type implemented: " + data.type);
          renderer.noData();
      }
    } catch (ex) {
      console.log(ex);
      renderer.noData();
    }
  }

  $(document).ready(function () {
    if ($("#chartAnchor").length == 0) {
      return;
    }

    var reportsPath = $("#chartAnchor").data("reports-path");
    var requests = expandDimensionToFilters(reportsPath);

    if (window.console && console.info) {
      console.info(
        "[kanaui] dimension fan-out:",
        requests.length,
        "request(s)",
        requests.map(function (r) {
          return r.label;
        })
      );
    }

    if (requests.length === 0) {
      $("#loading-spinner").remove();
      return new Kiddo.Renderer("#chartAnchor").noData();
    }

    var fetchAll = Promise.all(
      requests.map(function (req) {
        return d3.json(req.path).then(function (json) {
          return { label: req.label, json: json };
        });
      })
    );

    fetchAll
      .then(function (results) {
        $("#loading-spinner").remove();

        var data;
        if (results.length === 1 && results[0].label === null) {
          // No dimension fan-out — preserve original single-request behavior.
          data = results[0].json && results[0].json[0];
        } else {
          data = mergeFanOutResults(results);
        }

        if (!data) {
          return new Kiddo.Renderer("#chartAnchor").noData();
        }

        renderPayload(data);
      })
      .catch(function (error) {
        $("#loading-spinner").remove();

        var renderer = new Kiddo.Renderer("#chartAnchor");
        renderError(errorMessage(error));
        return renderer.noData();
      });
  });
})(d3, jQuery, window, document);
