import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLazyGetDataQuery } from "../../redux/testingApi";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { CSVLink } from "react-csv";

const HomeApiTable = () => {
  // user Input from redux
  const userInput = useSelector((state) => state.userInput.userInput);
  // trigger rtk query get request on user input
  const [trigger, { data, isSuccess }] = useLazyGetDataQuery();
  useEffect(() => {
    if (userInput !== "") {
      trigger(userInput);
    }
  }, [userInput]);
  // store column names, rows for tanstack react table from returned data
  const [columnNames, setColumnNames] = useState([]);
  const [dataRows, setDataRows] = useState([]);
  const [dataRowsComplete, setDataRowsComplete] = useState(false);
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    if (data) {
      // ***
      // column names
      // ***
      setColumnNames([]);
      const columns = (obj) => {
        for (const key in obj) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            columns(obj[key]);
          } else {
            setColumnNames((prev) => [
              ...prev,
              { header: key, accessorKey: key },
            ]);
          }
        }
      };
      columns(data[0]);
      // ***
      // rows
      // ***
      setDataRows([]);
      const nested = (obj, nestedObj = {}) => {
        for (const key in obj) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            nested(obj[key], nestedObj);
          } else {
            if (key in nestedObj) {
              nestedObj[`${key}*`] = obj[key];
            } else {
              nestedObj[key] = obj[key];
            }
          }
        }
        return nestedObj;
      };
      const rows = (obj) => {
        for (let i = 0; i < obj.length; i++) {
          setDataRows((previous) => [...previous, nested(obj[i])]);
        }
      };
      rows(data);
    }
  }, [data]);
  // store values in tanstack react table
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data: dataRows,
    columns: columnNames,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });
  useEffect(() => {
    //   // ***
    //   // overflow
    //   // ***
    const checkOverFlow = () => {
      const { clientWidth, scrollWidth } = containerRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    };
    checkOverFlow();
    window.addEventListener("resize", checkOverFlow);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkOverFlow);
    };
  }, [dataRows]);
  return (
    <div
      className="home-api-table-wrapper"
      ref={containerRef}
      style={{ justifyContent: isOverflowing ? "flex-start" : "center" }}
    >
      <div className="table-padding-wrapper">
        <div className="header-supplement-wrapper">
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="filter-input"
          />
          <CSVLink data={dataRows} className="csv-export">
            export
          </CSVLink>
        </div>
        <table style={{ width: table.getTotalSize() }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup, idx) => (
              <tr key={idx} className="api-column-row">
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={`${header}, ${idx}`}
                    className="api-column-header"
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <div
                      className={`resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={idx}
                className="api-data-row"
                style={{
                  backgroundColor:
                    idx % 2 === 0 ? "rgb(30,30,30)" : "rgb(20,20,20)",
                }}
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <td
                    key={`${cell}, ${idx}`}
                    className="api-data-cell"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-buttons-wrapper">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            first page
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            previous page
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            next page
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            last page
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeApiTable;
