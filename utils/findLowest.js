function findLowest(l1, l2, l3) {
  let expo = 0;
  if (l1 > 0 && l2 > 0) {
    expo = 0;
  } else if (l1 < 0 && l2 < 0) {
    expo = Math.abs(Math.min(l1, l2));
  } else if (l1 > 0 && l2 < 0) {
    expo = Math.abs(l2);
  } else if (l2 > 0 && l1 < 0) {
    expo = Math.abs(l1);
  }
  if (l3 < 0) {
    expo += Math.abs(l3);
  }
  return -expo;
}

module.exports = { findLowest };
