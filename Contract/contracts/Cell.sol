// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract BoardColor {
    address owner;
    uint8[7][5] private board;
    enum Color {
        white,
        black,
        red,
        blue
    }

    constructor() {
        uint8[7][5] storage _board = board;
        for (uint8 i; i < _board.length; i++) {
            for (uint8 j; j < _board[i].length; j++) {
                _board[i][j] = _random(abi.encodePacked(i, j));
            }
        }
        owner = msg.sender;
    }

    function _random(bytes memory _seed) internal pure returns (uint8) {
        uint256 _rand = uint256(keccak256(_seed));
        return (uint8(_rand) % 4) + 1;
    }

    function setCellColor(uint8 x, uint8 y, Color _color) public {
        require(msg.sender == owner, "Not Owner");
        board[x][y] = uint8(_color) + 1;
    }

    function getCellColor(
        uint8 x,
        uint8 y
    ) external view returns (string memory) {
        return _getColor(board[x][y]);
    }

    function getAllArray () external view returns(uint8[7][5] memory) {
        return board;
    }

    function _getColor(uint8 _id) internal pure returns (string memory) {
        if (_id == 2) return "black";
        if (_id == 3) return "red";
        if (_id == 4) return "blue";
        return "white";
    }
}
