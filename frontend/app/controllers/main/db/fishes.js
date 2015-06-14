import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';
import EmberValidations from 'ember-validations';
import DcFormControllerMixin from '../../../mixins/dc-form-controller-mixin';
import socket from '../../../utils/socket';

export default Ember.ArrayController.extend(DcFormControllerMixin, EmberValidations, {

    needs: 'main/db/fishfamilies',
    families: Ember.computed.alias("controllers.main/db/fishfamilies.dropdown"),
    
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
	var destroy = ColumnDefinition.create({
	    savedWidth: 30,
	    textAlign: 'text-align-center',
	    headerCellName: '',
	    tableCellViewClass: 'fa-destroy-table-cell',
	    contentPath: 'id',
	    canAutoResize: false
	});
	return [code, family, name, scientificName, chineseName, edit, destroy];
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
    openEditModal: false,
    openNewModal: false,
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
	clearSearch: function() {
	    this.set('searchfield', '');
	},

	// create/edit/delete actions and modals
	newRecord: function() {
	    this.set('newRecord', {});
	    this.toggleProperty('openNewModal');
	},
	createRecord: function() {
	    var that = this;
	    var postData = {
		family		: this.get('newRecord.family.value'),
		name		: this.get('newRecord.name'),
		scientificName	: this.get('newRecord.scientificName'),
		chineseName	: this.get('newRecord.chineseName')
	    };
	    socket().request(this, 'post', '/fishproducts/create', postData, function(err, response) {
		if(err) {
		    that.set('errorMessage', err);
		    that.set('attempts', that.get('attempts')+1);
		} else {
		    that.set('successMessage', 'New product created with code '+response.code);
		    that.set('search', response.code);
		    that.set('page', 1);
		}
	    });
	},
	newModalWasClosed: function() {
	    this.set('errorMessage', null);
	    this.set('attempts', 0);
	    this.set('successMessage', null);
	},
	editRecord: function(id) {
	    this.set('savedSearch', this.get('search'));
	    this.set('search', id);
	    this.set('savedPage', this.get('page'));
	    this.set('page', 1);
	    this.set('editedRecordId', id);
	    this.toggleProperty('openEditModal');
	},
	editModalWasClosed: function() {
	    this.get('model.content').forEach(function(item){
		item.rollback();
	    });
	    this.set('search', this.get('savedSearch'));
	    this.set('page', this.get('savedPage'));
	    this.set('editedRecordId', null);
	},
	deleteRecord: function(id) {
	    this.set('productIdToDelete', id);
	    this.toggleProperty('openConfirmModal');
	},
	confirmDeleteRecord: function() {
	    var that = this;
	    this.store.find('fishproduct', this.get('productIdToDelete')).then(function(product) {
		product.destroyRecord();
		that.set('productIdToDelete', null);
		that.toggleProperty('closeConfirmModal');
	    });
	}
    }
    
});
