import { json2csv } from 'json-2-csv';
import * as XLSX from "xlsx";

export async function downloadFile(content,format="json"){
    const anchor = document.createElement('a');

    if(format==="json"){
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content));
        anchor.setAttribute("href",dataStr);
        anchor.setAttribute("download", "items.json");
    }
    if(format==="csv"){
        const csv = await json2csv(content);
        const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
        anchor.setAttribute("href",dataStr);
        anchor.setAttribute("download", "items.csv");
    }
    if(format==="xlsx"){
        const ws = XLSX.utils.json_to_sheet(content);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,"Items");
        const xlsxBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
        
        const blob = new Blob([xlsxBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        anchor.setAttribute("href",url);
        anchor.setAttribute("download", "items.xlsx");
    }
    anchor.click();
}