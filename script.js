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

const toggleCheckStatus = (interest) => {
  const nextLevelInterests = nestedInterests(interest);

  if (!nextLevelInterests) {
    return;
  }

  nextLevelInterests.forEach((intr) => {
    intr.checked = interest.checked;
  });

  nextLevelInterests.forEach((nestedInterest) => {
    const newNested = nestedInterests(nestedInterest);

    if (newNested) {
      toggleCheckStatus(nestedInterest);
    }
  });
};

const bubbleStatus = (interest) => {
  const parent = closestParent(interest);

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
    bubbleStatus(parent);
  }
};

//Event Listeners
const assignListeners = function (interestss) {
  interestss.forEach((interest) => {
    interest.addEventListener("change", (e) => toggleCheckStatus(e.target));
    interest.addEventListener("change", (e) => bubbleStatus(e.target));

    const nextLevelInterests = nestedInterests(interest);

    if (nextLevelInterests) {
      assignListeners(nextLevelInterests);
    }
  });
};

//On Load
console.log("interests", interests);
assignListeners(interests);
