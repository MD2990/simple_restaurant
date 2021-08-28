import jsPDF from 'jspdf';

export const toPDF = ({ rows, columns, title, style = 'p', coordinates = 300, totalItems, totalAmount }) => {
	var doc = new jsPDF(style, 'pt'); // l or p



	const totalPagesExp = '{total_pages_count_string}';

	doc.autoTable({
		columns: columns,
		body: rows,
		headStyles: {
			halign: 'center',
			fillColor: '#c3e5eb',
			textColor: '#333333',
		
			font: 'times',
		},

		styles: {
			fillStyle: 'F', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
			minCellHeight: 20,
			cellWidth: 'auto', // 'auto', 'wrap' or a number },
			valign: 'middle', // top, middle, bottom
			overflow: 'linebreak', // visible, hidden, ellipsize or linebreak
			cellPadding: 4,
			fontSize: 9,
			font: 'times', // helvetica, times, courier (Amiri)  ##for arabic
			lineColor: 200,
			lineWidth: 0.1,
			halign: 'center',
			fontStyle: 'normal', // normal, bold, italic, bolditalic
		},
		didDrawPage: (data) => {
			if (doc.internal.getNumberOfPages() === 1) {
				doc.setFontSize(12);
				doc.text(title, coordinates, 30, 'center');
			}

			let footerStr = 'Page ' + doc.internal.getNumberOfPages();
			if (typeof doc.putTotalPages === 'function') {
				footerStr = footerStr + ' of ' + totalPagesExp;
			}
			doc.setFontSize(8);
			doc.text(
				footerStr,
				data.settings.margin.left,
				doc.internal.pageSize.height - 10,
			);
		},
	});
	if (typeof doc.putTotalPages === 'function') {
		doc.putTotalPages(totalPagesExp);
	}
let finalY = doc.las; // The y position on the page
  doc.text(`Total Items: ${totalItems}`, 70, doc.lastAutoTable.finalY + 20);
  doc.text(`Total Amount: ${totalAmount}`, 355, doc.lastAutoTable.finalY + 20);

	doc.save('table.pdf');
};
export default toPDF;
