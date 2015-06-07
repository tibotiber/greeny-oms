import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
import EmberValidations from 'ember-validations';
import DcFormControllerMixin from '../../../mixins/dc-form-controller-mixin';

export default Ember.ArrayController.extend(DcFormControllerMixin, EmberValidations, {

    nbOfRecords: function() {
	this.set('isLoading', false);
	return this.get('model.content').length;
    }.property('model.content'),

    // setup table
    columns: function() {
	var code = ColumnDefinition.create({
	    savedWidth: 70,
	    textAlign: 'text-align-left',
	    headerCellName: 'Code',
	    contentPath: 'id',
	    canAutoResize: true
	});
	var family = ColumnDefinition.create({
	    savedWidth: 100,
	    textAlign: 'text-align-left',
	    headerCellName: 'Family',
	    contentPath: 'family.name',
	    canAutoResize: true
	});
	var name = ColumnDefinition.create({
	    savedWidth: 250,
	    textAlign: 'text-align-left',
	    headerCellName: 'Name',
	    contentPath: 'name',
	    canAutoResize: true
	});
	var scientificName = ColumnDefinition.create({
	    savedWidth: 250,
	    textAlign: 'text-align-left',
	    headerCellName: 'Scientific Name',
	    contentPath: 'scientificName',
	    canAutoResize: true
	});
	var chineseName = ColumnDefinition.create({
	    savedWidth: 150,
	    textAlign: 'text-align-left',
	    headerCellName: 'Chinese Name',
	    contentPath: 'chineseName',
	    canAutoResize: true
	});
	var edit = ColumnDefinition.create({
	    savedWidth: 30,
	    textAlign: 'text-align-center',
	    headerCellName: '',
	    tableCellViewClass: 'fa-edit-table-cell',
	    contentPath: 'id',
	    canAutoResize: false
	});
	return [code, family, name, scientificName, chineseName, edit];
    }.property(),

    // setup pagination
    queryParams: ['page','limit','sort','search'],
    page: 1,
    limit: 50,
    sort: 'code',
    isLoading: false,
    prevPage: function() {
	return this.get('page') - 1;
    }.property('page'),
    nextPage: function() {
	return this.get('page') + 1;
    }.property('page'),
    isFirstPage: function() {
	return this.get('page') === 1;
    }.property('page'),
    isLastPage: function() {
	return this.get('nbOfRecords') !== this.get('limit');
    }.property('nbOfRecords','limit'),

    // setup search
    searchfield: '',

    // create/edit modals
    openModal: false,
    validations: {
	//TODO
    },
    editedRecord: function() {
	var that = this;
	return this.get('model.content').find(function(item) {
	    return item.id === that.get('editedRecordId');
	});
    }.property('model.content.[]','editedRecordId'),
    
    actions: {
	// search actions
	search: function() {
	    Ember.$('#searchBtn').click();
	},
	cancel: function() {
	    this.set('searchfield', '');
	},

	// create/edit/delete actions and modals
	newRecord: function() {
	    this.set('savedSearch', this.get('search'));
	    this.set('savedPage', this.get('page'));
	    this.toggleProperty('openModal');
	},
	editRecord: function(id) {
	    this.set('savedSearch', this.get('search'));
	    this.set('search', id);
	    this.set('savedPage', this.get('page'));
	    this.set('page', 1);
	    this.set('editedRecordId', id);
	    this.toggleProperty('openModal');
	},
	deleteRecord: function() {
	    console.log('delete record');
	},
	modalWasClosed: function() {
	    this.set('search', this.get('savedSearch'));
	    this.set('page', this.get('savedPage'));
	    this.set('editedRecordId', null);
	}
    }
    
});
