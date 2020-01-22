let getOwnPropertyDescriptors: (obj: { [x: string]: any }) => { [x: string]: PropertyDescriptor };

if (Object.getOwnPropertyDescriptors !== undefined) {
  getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
} else {
  getOwnPropertyDescriptors = function(obj: object) {
    let descriptors = {};

    Object.keys(obj).forEach(key => {
      descriptors[key] = Object.getOwnPropertyDescriptor(obj, key);
    });

    return descriptors;
  };
}


export default function pureAssign(...objects: object[]): object {
  return objects.reduce((acc, obj) => {
    return Object.defineProperties(acc, getOwnPropertyDescriptors(obj));
  }, {});
}
