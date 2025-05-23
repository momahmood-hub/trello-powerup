var t = TrelloPowerUp.iframe();

TrelloPowerUp.initialize({
  'board-buttons': function (t, options) {
    return [{
      icon: 'https://cdn-icons-png.flaticon.com/512/2682/2682065.png',
      text: 'Sync to Google Sheets',
      callback: function (t) {
        return t.board('name')
          .then(board =>
            t.cards('all').then(cards =>
              fetch('https://script.google.com/macros/s/AKfycbwQAMRWeHHEZhSOgLTf7DF0fWb9bdyLsXr_RABN5aXVRGLrJg0QHjuB8rwIP7mXyw6m/exec', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  boardName: board.name,
                  cards: cards.map(c => ({ name: c.name, desc: c.desc, url: c.url }))
                })
              })
            )
          )
          .then(() => t.alert({ message: 'Synced to Google Sheets!' }))
          .catch(err => {
            console.error(err);
            t.alert({ message: 'Failed to sync!' });
          });
      }
    }];
  }
});
