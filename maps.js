/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
  '-': ' ',
  'O': '🏁',
  'X': '🌳',
  'I': '🏠',
  'Y': '🏯', 
  'B': '🌴', 
  'C': '🌲', 
  'D': '🌳', 
  'F': '🏕️', 
  'G': '🎄', 
  'H': '🎋', 
  'J': '🚧', 
  'K': '🚧', 

  'PLAYER': '🏃',
  'BOMB_COLLISION': '💥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART': '❤️',
};

const maps = [];
maps.push(`
  -CXBIBXXX-
  -CXB-BXCC-
  -XXB-BXCC-
  -CCB-BCCX-
  -XXB-BXCC-
  -XXB-BXXX-
  -XXB-BXXX-
  -XCB-BXXX-
  -CCB-BXCX-
  -XXBOBCCC-
`);
maps.push(`
  BBBBOBBBBB
  X-----XXXX
  XX----XXXC
  X--CX-XXXX
  X-XCC--XCC
  X-JXXX-XCX
  XJ--XX--XX
  XX--XXX-XX
  XXX----ICC
  CCCCCCCCCC
  `);
maps.push(`
  Y-----XCCX
  GHHHH-XCCC
  XX----XXBX
  XX-XXBXXXX
  CC-----XJX
  CCXBXC-X-X
  XX-----X-X
  XX-XXXX--X
  XX-----O-X
  XBXBXX---X
`);
