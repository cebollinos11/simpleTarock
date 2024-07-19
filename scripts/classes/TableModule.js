// TableModule.js
export default class TableModule {
    constructor(data, containerId) {
        this.data = data;
        this.containerId = containerId;
    }

    generateTable() {
        if (!this.data || this.data.length === 0) {
            console.error('No data provided for the table.');
            return;
        }

        const table = document.createElement('table');
        table.border = '1';
        table.style.width = '100%';
        table.style.tableLayout = 'fixed';
        table.style.borderCollapse = "collapse"

        // Generate table headers
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = Object.keys(this.data[0]);
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(headerText));
            th.style.overflow = 'hidden';
            th.style.textOverflow = 'ellipsis';
            th.style.whiteSpace = 'nowrap';
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Generate table rows
        const tbody = document.createElement('tbody');
        this.data.forEach(rowData => {
            const row = document.createElement('tr');

            headers.forEach(header => {
                const cell = document.createElement('td');
                cell.appendChild(document.createTextNode(rowData[header]));
                cell.style.overflow = 'hidden';
                cell.style.textOverflow = 'ellipsis';
                cell.style.whiteSpace = 'nowrap';
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // Insert table into the container
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = ''; // Clear existing content
            container.appendChild(table);
        } else {
            console.error(`Container with id "${this.containerId}" not found.`);
        }
    }
}
