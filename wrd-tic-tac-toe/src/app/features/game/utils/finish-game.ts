import { IMovement } from '../../../store/models';
import { FinishLinePosition } from '../interfaces/interfaces';

export default class FinishGame {
  verifyFinish(movementArray: IMovement[]): FinishLinePosition | boolean {
    const diagonals = this.verifyDiagonals(movementArray);
    if (diagonals) {
      return diagonals;
    }
    for (let i = 0; i < 3; i++) {
      const row = movementArray.filter(el => {
        return el.cellId.j === i;
      });
      const col = movementArray.filter(el => {
        return el.cellId.i === i;
      });
      if (row && row.length === 3) {
        const rowNumber = this.verifyRowOrColumn(row);
        if (rowNumber) {
          return this.placeFinishLines(rowNumber, 'row');
        }
      }
      if (col && col.length === 3) {
        const colNumber = this.verifyRowOrColumn(col);
        if (colNumber) {
          return this.placeFinishLines(colNumber, 'col');
        }
      }
    }
    return false;
  }

  private verifyRowOrColumn(rowOrColumn: IMovement[]): { i; j } | boolean {
    if (rowOrColumn[0].movement === rowOrColumn[1].movement && rowOrColumn[0].movement === rowOrColumn[2].movement) {
      return rowOrColumn[0].cellId;
    }
    return false;
  }

  private verifyDiagonals(movementArray: IMovement[]): FinishLinePosition | boolean {
    const primaryDiag = movementArray.filter(el => {
      return el.cellId.j === el.cellId.i;
    });
    const secondaryDiag = movementArray.filter(el => {
      return el.cellId.j + el.cellId.i === 2;
    });
    if (primaryDiag && primaryDiag.length === 3) {
      const primaryDiagNumber = this.verifyRowOrColumn(primaryDiag);
      if (primaryDiagNumber) {
        return this.placeFinishLines(primaryDiagNumber, 'primaryDiag');
      }
    }
    if (secondaryDiag && secondaryDiag.length === 3) {
      const secondaryDiagNumber = this.verifyRowOrColumn(secondaryDiag);
      if (secondaryDiagNumber) {
        return this.placeFinishLines(secondaryDiagNumber, 'secondaryDiag');
      }
    }
    return false;
  }

  private placeFinishLines(rowColNumber, type: string): FinishLinePosition {
    switch (type) {
      case 'row': {
        const colPosition = rowColNumber.j * 70 - 116;
        return {
          top: '300px',
          left: colPosition + 'px',
          transform: 'Rotate(90deg)'
        } as FinishLinePosition;
      }
      case 'col': {
        const rowPosition = rowColNumber.i * 70 + 246;
        return {
          top: rowPosition + 'px',
          left: '-47px',
          transform: null
        } as FinishLinePosition;
      }
      case 'primaryDiag': {
        return {
          top: '315px',
          left: '-46px',
          transform: 'Rotate(45deg)'
        };
      }
      case 'secondaryDiag': {
        return {
          top: '315px',
          left: '-46px',
          transform: 'Rotate(135deg)'
        };
      }
    }
  }
}
