class RpsGame {
  constructor(p1, p2) {
    this._players = [p1, p2];
    this._turns = [null, null];
    this._sendToPlayers("بدأت اللعبة ...!");

    this._players.forEach((player, idx) => {
      player.on("turn", (turn) => {
        this._onTurn(idx, turn);
      });
    });
  }

  _sendToPlayers(msg) {
    this._players.forEach((player) => player.emit("message", msg));
  }

  _sendToPlayer(playerIndex, msg) {
    this._players[playerIndex].emit("message", msg);
  }

  _onTurn(playerIndex, turn) {
    this._turns[playerIndex] = turn;
    switch (turn) {
      case "حجر":
        this._sendToPlayer(playerIndex, `لقد أخترت:  حجر`);
        break;
      case "ورقة":
        this._sendToPlayer(playerIndex, `لقد أخترت:  ورقة`);
        break;
      case "مقص":
        this._sendToPlayer(playerIndex, `لقد أخترت:  مقص`);
        break;
      default:
        throw new Error(`Could not decode turn ${turn}`);
    }
    //  this._sendToPlayer(playerIndex, `لقد أخترت:  ${turn}`);
    this._checkGameOver();
  }

  _checkGameOver() {
    const turns = this._turns;
    if (turns[0] && turns[1]) {
      this._sendToPlayers("انتهت اللعبة   " + turns.join("  :  "));
      this._getGameResult();
      this._turns = [null, null];
      this._sendToPlayers("جولة جديدة !!!!!!");
    }
  }

  _getGameResult() {
    const p0 = this._decodeTurn(this._turns[0]);
    const p1 = this._decodeTurn(this._turns[1]);

    const distance = (p1 - p0 + 3) % 3;

    switch (distance) {
      //draw
      case 0:
        this._sendToPlayers("تعادل!");
        break;
      // p0
      case 1:
        this._sandWinMessage(this._players[0], this._players[1]);
        break;
      // p1
      case 2:
        this._sandWinMessage(this._players[1], this._players[0]);
        break;
    }
  }

  _sandWinMessage(winner, loser) {
    winner.emit("message", "لقد ربحت !!!!");
    loser.emit("message", "لقد خسرت ...");
  }

  _decodeTurn(turn) {
    switch (turn) {
      case "حجر":
        return 0;
      case "مقص":
        return 1;
      case "ورقة":
        return 2;
      default:
        throw new Error(`Could not decode turn ${turn}`);
    }
  }
}

module.exports = RpsGame;
