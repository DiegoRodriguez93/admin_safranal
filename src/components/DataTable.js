import React, { useEffect } from "react";
import $ from 'jquery';
import 'datatables.net';

export default function DataTable({ url, thead, tableId, refreshID }) {

/*     var tablee; */

    useEffect(() => {

        if (!$.fn.DataTable.isDataTable(`#${tableId}`)) {
          window.$table = $('#'+tableId).DataTable({
                ajax: {
                    url: url
                },
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
                }
            });
        } else {
            window.$table.ajax.reload();
        }
    }, [refreshID]);

    return (
        <>
            <table
                id={tableId}
                className="table dataTable no-footer"
                style={{ width: "100%" }}
            >
                <thead>
                    <tr>
                        {thead.map((theadValue) => (
                            <th key={theadValue}>{theadValue}</th>
                        ))}
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </>
    );
}
