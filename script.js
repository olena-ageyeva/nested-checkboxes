const interests = document.querySelectorAll(
  ".interests_main > ul >.interest > label > .interest__check"
);

const nestedInterests = function (interest) {
  return interest?.parentElement?.parentElement
    .querySelector(".interests")
    ?.querySelectorAll(":scope > .interest >label > .interest__check");
};

const closestParent = function (interest) {
  return interest.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(
    ":scope >label > .interest__check"
  );
};

const toggleCheckStatus = function () {
  const nextLevelInterests = nestedInterests(this);

  if (!nextLevelInterests) {
    return;
  }

  nextLevelInterests.forEach((interest) => {
    interest.checked = this.checked;
  });

  nextLevelInterests.forEach((nestedInterest) => {
    const newNested = nestedInterests(nestedInterest);

    if (newNested) {
      toggleCheckStatus.bind(nestedInterest)();
    }
  });
};

const bubbleStatus = function () {
  const parent = closestParent(this);

  if (!parent) {
    return;
  }

  const nestedInParent = nestedInterests(parent);

  parent.checked = Array.from(nestedInParent).reduce(
    (acc, current) => acc || current.checked,
    false
  );

  const nextParent = closestParent(parent);

  if (nextParent) {
    bubbleStatus.bind(parent)();
  }
};

//Event Listeners
const assignListeners = function (interestss) {
  interestss.forEach((interest) => {
    interest.addEventListener("change", toggleCheckStatus);
    interest.addEventListener("change", bubbleStatus);

    const nextLevelInterests = nestedInterests(interest);

    if (nextLevelInterests) {
      assignListeners(nextLevelInterests);
    }
  });
};

//On Load
console.log("interests", interests);
assignListeners(interests);
