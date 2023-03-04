export const organizeComprehensions = (settledPromises) => {
  let comprehensions = [];
  settledPromises.forEach((result) => {
    if (!comprehensions[result.value.index]) {
      comprehensions[result.value.index] = {
        title: result.value.title,
        url: result.value.url,
        description: result.value.description,
        entities: [],
        syntax: [],
      };
    }
    if (result.value.type == "entity") {
      comprehensions[result.value.index]["entities"].push(
        result.value.entities
      );
    } else {
      comprehensions[result.value.index]["syntax"].push(result.value.syntax);
    }
  });
  return comprehensions;
};
