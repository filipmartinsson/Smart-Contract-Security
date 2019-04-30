pragma solidity 0.5.1;

contract Storage {
    uint256 number;

    function getNumber() internal view returns (uint){
        return number;
    }

    function setNumber(uint256 _number) internal{
        number = _number;
    }
}
