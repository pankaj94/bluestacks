var dummyData = [
		{
			id : 1,
			name : 'Test Whatsapp',
			pricing : 123,
			dateAddedOn : '2019-06-05',
			dateUpdated : '2019-06-05',
			rating : 5,
			information : 'This is a test Whatsapp which is campign scheduled by BlueStacks'
		},
		{
			id : 2,
			name : 'Super Jewels Quest',
			pricing : 234,
			dateAddedOn : '2019-06-05',
			dateUpdated : '2019-06-05',
			rating : 5,
			information : 'This is a Super Jewels Quest which is campign scheduled by BlueStacks'
		},
		{
			id : 3,
			name : 'Mole Slayer',
			pricing : 345,
			dateAddedOn : '2019-06-05',
			dateUpdated : '2019-06-05',
			rating : 5,
			information : 'This is a Mole Slayer which is campign scheduled by BlueStacks'
		},
		{
			id : 4,
			name : 'Mancala Mix',
			pricing : 456,
			dateAddedOn : '2019-06-05',
			dateUpdated : '2019-06-05',
			rating : 5,
			information : 'This is a Mancala Mix which is campign scheduled by BlueStacks'
		},
		{
			id : 5,
			name : 'BlueStacks Mocks',
			pricing : 567,
			dateAddedOn : '2019-06-05',
			dateUpdated : '2019-06-05',
			rating : 5,
			information : 'This is a BlueStacks Mocks which is campign scheduled by BlueStacks'
		}
	]

var obj = {
	data : [],
	loadDataIntoLocalStorage : function(){

		if(!!this.manageLocalStorage.getData('campaignData')){
			this.data = this.manageLocalStorage.getData('campaignData');
		}
		else{
			this.data = dummyData;
			this.manageLocalStorage.setData('campaignData',dummyData);
		}
		return this;
	},
	manageLocalStorage : {
		setData : function(key,data){
			if(typeof data !== 'string' && typeof data !==undefined){
				data = JSON.stringify(data);
				localStorage.setItem(key,data);
			}else{
				localStorage.setItem(key,data);
			}
			return true;
			
		},
		getData : function(key){
			var data = localStorage.getItem(key);
			return JSON.parse(data);
		}
	},
	checkData : function(){
		this.loadDataIntoLocalStorage();
		this.renderTable();
		
	},

	renderTable : function(){
		if(!!this.data){
			$('.loader').show();
			var tbody = "";
			var data = this.data;
			$.each(data,function(i,v){
				tbody = tbody +  "<tr data-id="+i+">"+
						"<td data-type='dateUpdated'>" +
							"<div>" + v.dateUpdated + "</div>"+
							"<div>" + obj.calculateDays(v.dateUpdated) + "</div>"+
						"</td>" + 
						"<td data-type='name'>" + v.name + "</td>" + 
						"<td data-type='pricing'><span class='dollarIcon' >&#0036</span></td>" + 
						"<td ><input type='date' class=' calDetail hide glyphicon glyphicon-calendar' /><span class=' calIcon glyphicon glyphicon-calendar'></span></td>" + 
						"</tr>";
			})
			$('#tblBody').html(tbody);
			$('.loader').hide();
			this.bindClickEvents();

		}else{
			console.log('No Data Found');
		}
	},
	calculateDays : function(date){
		var diff = new Date() -  new Date(date);
		var days = Math.ceil(diff/(1000*3600*24));
		if( days> 0){
			return Math.abs(days)+ ' days ago';
		}else{
			return Math.abs(days) + ' days later';
		}
	},
	bindClickEvents : function(){
		$(document).on('click','#tblBody tr td',function(){
			var dataId = $(this).parent().attr('data-id');
			var type = $(this).attr('data-type');
			if(!!type){
				$('.modal-title').html(obj.data[dataId].name);

				$('.modal-body div').html(obj.data[dataId].information);
				$('.modal-body p').html(type +' : '+obj.data[dataId][type]);
				$('#myModal').modal(true);
			}
			
		})
		$('.calIcon').on('click',function(){
			$(this).siblings('[type="date"]').removeClass('hide').focus().click();
			$(this).addClass('hide');
		})
		$('.calDetail').change(function(){
			var val = $(this).val();
			$(this).siblings('.calIcon').removeClass('hide');
			$(this).addClass('hide');
			var id = $(this).parents('tr').attr('data-id');
			obj.updateDataValues(id,val);
		})
	},
	updateDataValues : function(id,val){
		this.data[id].dateUpdated = val;
		this.manageLocalStorage.setData('campaignData',this.data);
		this.renderTable();
	},
	init : function() {
		this.checkData()
	}
}
obj.init();