$(document).ready(function() {
	$('#query').on("keypress", function(event){
		/* keyCode 13 is the enter key to submit query */
		if (event.keyCode == 13) {
			  var score = 0;
                var attempt = 0;
			var query = this.value;
			var key = "uTtk10NFnmdtYP4f3URNps6BFeFqh1Jq";
			var url = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + key + "&limit=6";
			$.getJSON(url, function(json) {
				
				/* memory game */
	
				// need two copies of each image in a list
				var cards = [];
				
				// place image into a grid
				// obscure images
				var $game = $('#game');
				var matches = 2;
				$("#direction").text("click any two cards to match");
				for (let j = 0; j < matches; j++) {
					for (let i = 0; i < json.data.length; i++) {
						var img = json.data[i];
						var div = $('<div>')
						.addClass('card')
							.attr('data-num', i);
						var imgElem = new Image();
						imgElem.src = img.images.downsized.url;
						imgElem.style.display = "none";
						div.append(imgElem);
						cards.push(div);
					}
				}
				cards.sort(function() { return 0.5 - Math.random() });
				for (let i = 0; i < cards.length; i++) {
					$game.append(cards[i]);
				}
					 
				var clickedCards = [];
              
				$('.card').click(function() {
					attempt++;
					$('#attempt').text('Number of tries ' + attempt);
                            
					const $card = $(this);
					// reveal image
				   $card.children().show();
					$card.addClass("cardShow");
					// is there another image to compare
					//console.log(clickedCards.length, matches);
					if (clickedCards.length == matches - 1) {
						// compare images
						var allMatch = true;
						for (let i = 0; i < clickedCards.length; i++) {
							if (clickedCards[i].num != $card.data().num) {
								allMatch = false;
							}
						}
						if (allMatch) {
							// match, stay face up
							//console.log("this is a match");
                            score++;
							$('#score').text('Number of correct answers ' + score);
							$card.children().addClass("match");
							for (let i = 0; i < clickedCards.length; i++) {
								clickedCards[i].img.addClass("match");
								}
                            if  (score == cards.length/2){
                                $("#win").addClass( "winShow");
							}
						} else {
							// not a match, hide the images
							$card.children().delay(1000).hide(0);
							for (let i = 0; i < clickedCards.length; i++) {
								clickedCards[i].img.delay(1000).hide(0);
							}
                         
						}
						// clear the current image
						clickedCards = [];
					} else {
						// keep track of current image
						clickedCards.push({
							num: $card.data().num,
							img: $card.find('img')
						});
					}
                
				});
					
			});
		}
	});
});