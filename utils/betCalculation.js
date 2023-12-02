export const calculatePL = (bet, runner1, runner2) => {
  console.log(runner1, runner2, "runner");
  let l2 = 0;
  let l1 = 0;
  if (!bet) {
    return [l1, l2];
  }
  console.log(bet, "allbet")
  for (let h = 0; h < bet.length; h++) {
    console.log(bet, "firrrrst bett from")
    if (
      bet[h].runner_name === runner1 &&
      bet[h].bet_type === "back" &&
      (bet[h].bet_category == "odds" || bet[h].bet_category == "bookmaker")
    ) {
      l2 -= Number(bet[h].stake);
      l1 += Number(bet[h].stake) * Number(bet[h].rate) - Number(bet[h].stake);
    }
    // console.log(l1,l2, "11")
    if (
      bet[h].runner_name === runner1 &&
      bet[h].bet_type === "lay" &&
      (bet[h].bet_category == "odds" || bet[h].bet_category == "bookmaker")
    ) {
      l1 -= Math.floor(
        Number(bet[h].stake) * Number(bet[h].rate) - Number(bet[h].stake)
      );
      l2 += Number(bet[h].stake);
    }
    // console.log(l1,l2, "22")
    if (
      bet[h].runner_name === runner2 &&
      bet[h].bet_type === "back" &&
      (bet[h].bet_category == "odds" || bet[h].bet_category == "bookmaker")
    ) {
      l2 += Math.floor(Number(bet[h].stake) * Number(bet[h].rate));
      l2 -= Number(bet[h].stake);
      l1 -= Number(bet[h].stake);
    }
    // console.log(l1,l2, "33")
    if (
      bet[h].runner_name === runner2 &&
      bet[h].bet_type === "lay" &&
      (bet[h].bet_category == "odds" || bet[h].bet_category == "bookmaker")
    ) {
      l2 -=Math.floor(Number(bet[h].stake) * Number(bet[h].rate)) -Number(bet[h].stake);
      l1 += Number(bet[h].stake);
      
    }
    // console.log(l1,l2, "44")
  }

  console.log(runner1, runner2,l1, l2,  "runner");
   
  return [Math.round(l1), Math.round(l2)];
};
