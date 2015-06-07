import TableCell from 'ember-table/views/table-cell';

export default TableCell.extend({
    templateName: 'ember-table/fa-edit-cell',
    classNames: 'fa-table-cell fa-edit-table-cell',
    click: function() {
	this.get('controller.env').send('editRecord', this.get('cellContent'));
    }
});
