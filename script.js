function testFunction()
{
    fetch('data.json', { mode: 'no-cors' })
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            var jsonData = JSON.parse(text);
            console.log(jsonData);
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
}

testFunction();