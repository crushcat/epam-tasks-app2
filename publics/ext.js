    //var form = document.getElementById("itemForm");
    var form = document.forms.itemsForm;
    form.onsubmit = onFormSubmit;
    //form.addEventListener("submit",onFormSubmit);
    document.getElementById("fEmail").onchange = function(){validateData(form,true)};
    document.getElementById("fPhone").onchange = function(){validateData(form,true)};

    var rqst = new XMLHttpRequest();
    rqst.open("GET", "/items", true);
    rqst.onreadystatechange = onRequest;
    rqst.send();

    function onRequest(){
        if (this.readyState != 4)
            return;
        if (this.status != 200) {
            return;
        } else {
            var items = JSON.parse(this.responseText);
            if (!!items) {
                refreshItems(items);
            }
        }
    };

    function onFormSubmit(event){
        if(validateData(this,false)){
            var rqst = new XMLHttpRequest();
            rqst.open("POST", "/items");
            rqst.onreadystatechange = function(){
                if ( 4 != rqst.readyState ) {
                return;
            }
            if ( 200 != rqst.status ) {
                return;
            }
            else{
                var item = JSON.parse(this.responseText);
                addSingleItem(item, document.getElementById('items-table'));
                clearForm();
            }
                };
            rqst.send(getFormData(form));
            
        }
        return false;
    }

    function getFormData(form){
        var output = "";
        for (var i=1; i<form.length; i++){
            if (form[i].type === 'text'){
                output += (i==1?'':'&') + form[i].name + '=' + encodeURIComponent(form[i].value);
            }
        }
        return output;
    }

    function addSingleItem(item, table){
        if (table.children.length<1) {
            createTblHeader(table);
        };
        var h_row = document.createElement('tr');
        h_row.itemId = item.id;
        var rowNo = document.createElement('td');
        rowNo.innerText = table.childNodes.length;
        //rowNo.setAttribute('class','rowNo');
        h_row.appendChild(rowNo);
        //h_row.appendChild(document.createElement('td'));
        for(key in item) {
            if(item.hasOwnProperty(key) && key != 'id')
                h_row.appendChild(document.createElement('td')).innerText = item[key];
        }
        var rmvAnch = document.createElement("a");
        rmvAnch.setAttribute("href", "#");
        rmvAnch.setAttribute("id", item.id);
        rmvAnch.appendChild(document.createTextNode("Remove"));
        rmvAnch.addEventListener('click', removeRow, false);
        var rmvCell = document.createElement('td');
        rmvCell.appendChild(rmvAnch);
        h_row.appendChild(rmvCell);
        table.appendChild(h_row);
    }

    function removeSingleItem(itemId){
        var table = document.getElementById('items-table');
        var rows = table.children;
        for(var i=1; i<rows.length; i++){
            if(rows[i].itemId == itemId ) {
                table.children[i].parentElement.removeChild(table.children[i]);
                recompileNo(rows)
                return true;
            }
        }
        return false;
    }
    function createTblHeader(table){
        var header = document.createElement('tr');
        header.setAttribute('class','header');
        header.appendChild(document.createElement('th')).innerText= "#";
        header.appendChild(document.createElement('th')).innerText= "Name";
        header.appendChild(document.createElement('th')).innerText= "Email";
        header.appendChild(document.createElement('th')).innerText= "Phone";
        header.appendChild(document.createElement('th')).innerText= "Remove";
        table.appendChild(header);
    }

    function refreshItems(items){
        var t_div = document.getElementById("listItems");
        t_div.innerHTML = '';
        var table = document.createElement("table");
        table.setAttribute('id','items-table');
        if (items.length>0) {
            createTblHeader(table);
            t_div.appendChild(table);

            for (var i=0; i<items.length; i++) {
                addSingleItem(items[i],table);

            }
        };
            t_div.appendChild(table);
        
    }

    function recompileNo(rows){
        for(var i=1; i<rows.length; i++) {
            rows[i].cells[0].innerText = i;
            
        }
    }

    function removeRow () {
         var rId = window.event.target.id;
         removeData(rId);
         removeSingleItem(rId);
    }

    function removeData (id) {
        var rqst = new XMLHttpRequest();
        rqst.open("DELETE", "/items?id="+id);
        rqst.onreadystatechange = function(){
            if (this.readyState != 4)
                return;
            if (this.status != 200) {
                return;
            }
            else{
                var item = JSON.parse(this.responseText);
            }
            
        };
        rqst.send();
        return;
    }

    
    function clearForm(){
        for (var i=0; i<form.length; i++){
            if (form[i].type === 'text'){
                form[i].value = '';
            }
        }
    }

    function validateData(form, onchange){
        var valid = true;
        var vEmail = form.email.value;
        var vPhone = form.phone.value;
        wipeMsgs();
        if(!isValidEmail(vEmail)){
            setValidateMsg('Please enter valid email', 'fEmail');
            valid = false;
        }
        if(!isValidPhone(vPhone)){
            setValidateMsg('Please enter valid phone number', 'fPhone');
            valid = false;
        }
        return valid;
    }

    function isValidPhone(phone) {
        return (!!phone.match(/^\+375\d{9}$/) || !!phone.match(/^8017\d{7}$/)) ;
    }

    function isValidEmail(email) {
        return !!(email.match(/^(\w|\.)+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/));
    }

    function setValidateMsg(msg, id){
        var msgBox = document.createElement('div');
        msgBox.setAttribute('class','validateMsg');
        msgBox.innerText = msg;
        document.getElementById(id).appendChild(msgBox);
    }

    function wipeMsgs(){
        var boxes = document.getElementsByTagName('div');
        for (var i = 0; i < boxes.length; i++) {
            if(boxes[i].getAttribute('class')== 'validateMsg'){
                boxes[i].parentNode.removeChild(boxes[i]);
                i--;
            }

        };
    }