
$(document).ready(function(){
var words_arr = [];
var translated_arr = [];
//var mood_arr = [":)"];
var mood;
//var words_obj = {};
var searchWord;
var translatedWord = "";
list();
	$(document).bind('keypress', function(e) {
        if(e.keyCode == 13){
            $("button").trigger('click');
        }
    });
	
	
	$("button").click(function(){
	
		searchWord = $("input[name='word']").val();
		
		//$.getJSON("https://api.multillect.com/translate/json/1.0/637?method=translate/api/translate&from=en&to=ru&text="+ searchWord +"&sig=d78a3d1e9211d574dfb28e859489601f", function(json) {
			//translatedWord = json.result.translated;
			//translated_arr.push(translatedWord);
			console.log("translatedWord " + translatedWord);
			
			console.log("searchWord " + searchWord);
			if(searchWord.length > 0){
		words_arr.push(searchWord);
		//unique(words_arr); видалити
		list(searchWord, translated_arr);
		//search(searchWord); видалити
		console.log(" words_obj " + words_obj);
		search(searchWord);
		}
		//});
	
	
		

		
	});
	
	function unique(arr, translated_arr){
	var words_obj = {};
		for(var i = 0; i < arr.length; i++){
			var word = arr[i].toLowerCase();
			
			(words_obj[word]) ? words_obj[word] = { count: words_obj[word].count += 1, translation: translated_arr[i], mood_img: mood} : words_obj[word] = {count: 1, translation: translated_arr[i], mood_img: ":)"};
			
			if(words_obj[word].count && words_obj[word].count < 4){
				mood = ":)";
			}else if( words_obj[word].count && words_obj[word].count < 8){
				mood = ":|";
			}else if(words_obj[word].count && words_obj[word].count < 16){
				mood = ":(";
			}else if(words_obj[word].count && words_obj[word].count >= 16){
				mood = "o_O";
			}
			
		}
		console.log(words_obj);
		return words_obj;
	}
	function search(searchWord){
		for(word in words_obj){
			var found = $("."+ word);
			console.log("found " + found)
			if(word == searchWord){
				$("li:contains(" +''+ searchWord+''+ ")").insertAfter("ul li:nth-child(1)");
			}
		}
	}
	function list(searchWord, translatedWord){
	words_obj = unique(words_arr, translated_arr);
	console.log("translated_arr " + translated_arr);
	$("li:not(li:first-child)").remove();
	
	var count = 0;
		for(word in words_obj){
		console.log(words_obj);
		count += 1;
		
			$("ul").append("<li class='flex-container " + word + " ' ><div>" + count + "</div><div>" + word + "</div><div>" + words_obj[word].count + "</div><div>" + words_obj[word].translation + "</div><div>" + words_obj[word].mood_img + "</div><div class='del' id='" + word + "'>х</div></li>");
			
		}
		console.log("list func");
		console.log("words_arr " + words_arr);
	}
	
	$("ul").on("click", "li .del", function(){
		console.log("del clicked!!!!!!!!!");
		var id_word = $(this).attr("id");
		console.log("id_word " + id_word);
		deleteWord(id_word, words_arr, translated_arr);
		
		$("." + id_word).remove();
		
	});
	
	function deleteWord(id, arr1, arr2){
		for(var i = 0; i < arr1.length; i++){
			if(words_arr[i] == id){
				arr1.splice(i, 1);
				arr2.splice(i, 1);
				i--;
			}
		}
		
		console.log("words_arr " + arr1);
		console.log("translated_arr " + arr2);
		
		for(word in words_obj){
			if(word == id){
				delete words_obj[word];
			}
		}
		console.log(words_obj);
	}
});