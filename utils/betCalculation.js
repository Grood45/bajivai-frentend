export const calculatePL = (bet, runner1, runner2, runner3 = "The Draw") => {
  let l2 = 0;
  let l1 = 0;
  let l3 = 0;
  let totalDrawLay = 0;
  let totalDrawBack = 0;
  let totalDrawExposure = 0;
  if (!bet) {
    return [l1, l2, l3];
  }
  for (let h = 0; h < bet.length; h++) {
    if (
      bet[h].runner_name === runner1 &&
      bet[h].bet_type === "back" &&
      bet[h].bet_category == "odds"
    ) {
      l2 -= Number(bet[h].stake);
      l1 += Number(bet[h].stake) * Number(bet[h].rate) - Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner1 &&
      bet[h].bet_type === "lay" &&
      bet[h].bet_category == "odds"
    ) {
      l1 -= Math.floor(
        Number(bet[h].stake) * Number(bet[h].rate) - Number(bet[h].stake)
      );
      l2 += Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner2 &&
      bet[h].bet_type === "back" &&
      bet[h].bet_category == "odds"
    ) {
      l2 += Math.floor(Number(bet[h].stake) * Number(bet[h].rate));
      l2 -= Number(bet[h].stake);
      l1 -= Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner2 &&
      bet[h].bet_type === "lay" &&
      bet[h].bet_category == "odds"
    ) {
      l2 -=
        Math.floor(Number(bet[h].stake) * Number(bet[h].rate)) -
        Number(bet[h].stake);
      l1 += Number(bet[h].stake);
    }

    // for draw calculation
    if (
      bet[h].runner_name === runner3 &&
      bet[h].bet_type === "back" &&
      bet[h].bet_category == "odds"
    ) {
      l3 += Math.round(Number(bet[h].stake) * bet[h].rate - bet[h].stake);
      totalDrawBack += bet[h].stake;
      l1-=bet[h].stake
      l2-=bet[h].stake
    }
    if (
      bet[h].runner_name === runner3 &&
      bet[h].bet_type === "lay" &&
      bet[h].bet_category == "odds"
    ) {
      l3 -= Math.round(Number(bet[h].stake) * bet[h].rate - bet[h].stake);
      // addstake here
      totalDrawLay += bet[h].stake;
      l1+=bet[h].stake
      l2+=bet[h].stake
    }
  }
  // console.log(totalDrawBack, totalDrawLay);
  return [Math.round(l1), Math.round(l2), Math.round(l3)];
};

export const calculateBookmakerPL = (bet, runner1, runner2, runner3 = "The Draw") => {
  let l2 = 0;
  let l1 = 0;
  let l3 = 0;
  let totalDrawLay = 0;
  let totalDrawBack = 0;
  let totalDrawExposure = 0;
  if (!bet) {
    return [l1, l2, l3];
  }
  for (let h = 0; h < bet.length; h++) {
    if (
      bet[h].runner_name === runner1 &&
      bet[h].bet_type === "back" &&
      bet[h].bet_category == "bookmaker"
    ) {
      l2 -= Number(bet[h].stake);
      l1 += Number(bet[h].stake) * Number(bet[h].rate) - Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner1 &&
      bet[h].bet_type === "lay" &&
      bet[h].bet_category == "bookmaker"
    ) {
      l1 -= Math.floor(
        Number(bet[h].stake) * Number(bet[h].rate) - Number(bet[h].stake)
      );
      l2 += Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner2 &&
      bet[h].bet_type === "back" &&
      bet[h].bet_category == "bookmaker"
    ) {
      l2 += Math.floor(Number(bet[h].stake) * Number(bet[h].rate));
      l2 -= Number(bet[h].stake);
      l1 -= Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner2 &&
      bet[h].bet_type === "lay" &&
      bet[h].bet_category == "bookmaker"
    ) {
      l2 -=
        Math.floor(Number(bet[h].stake) * Number(bet[h].rate)) -
        Number(bet[h].stake);
      l1 += Number(bet[h].stake);
    }

    // for draw calculation
    if (
      bet[h].runner_name === runner3 &&
      bet[h].bet_type === "back" &&
      bet[h].bet_category == "bookmaker"
     
    ) {
      l3 += Math.round(Number(bet[h].stake) * bet[h].rate - bet[h].stake);
      totalDrawBack += bet[h].stake;
      l1-=bet[h].stake
      l2-=bet[h].stake
    }
    if (
      bet[h].runner_name === runner3 &&
      bet[h].bet_type === "lay" &&
      bet[h].bet_category == "bookmaker"
    ) {
      l3 -= Math.round(Number(bet[h].stake) * bet[h].rate - bet[h].stake);
      l1+=bet[h].stake
      l2+=bet[h].stake
      // addstake here
      totalDrawLay += bet[h].stake;
    }
  }
  console.log(totalDrawBack, totalDrawLay);
  return [Math.round(l1), Math.round(l2), math.round(l3)];
};
