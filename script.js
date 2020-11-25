const interests = document.querySelectorAll(
  ".interests_main > ul >.interest > label > .interest__check"
);

const nestedInterests = function (interest) {
  return interest.parentElement.parentElement
    .querySelector(".interests")
    ?.querySelectorAll(":scope > .interest >label > .interest__check");
};

const toggleCheckStatus = function () {
  const nextLevelInterests = nestedInterests(this);

  nextLevelInterests.forEach(
    (interest) => (interest.checked = !interest.checked)
  );

  nextLevelInterests.forEach((nestedInterest) => {
    const newNested = nestedInterests(nestedInterest);

    if (newNested) {
      toggleCheckStatus.bind(nestedInterest)();
    }
  });
};

//Event Listeners
const assignListeners = function (interestss) {
  interestss.forEach((interest) => {
    interest.addEventListener("change", toggleCheckStatus);

    const nextLevelInterests = nestedInterests(interest);

    if (nextLevelInterests) {
      assignListeners(nextLevelInterests);
    }
  });
};

//On Load
console.log("interests", interests);
assignListeners(interests);
