import TableCell from 'ember-table/views/table-cell';

export default TableCell.extend({
    templateName: 'ember-table/fa-destroy-cell',
    classNames: 'fa-table-cell fa-destroy-table-cell',
    click: function() {
	this.get('controller.env').send('deleteRecord', this.get('cellContent'));
    }
});
