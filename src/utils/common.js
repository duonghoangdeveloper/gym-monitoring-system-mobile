/* eslint-disable no-plusplus */
import ImagePicker from 'react-native-image-picker';

import { PLAT_FORM } from '../constants/app';

const defaultFunction = () => {};

export function getBehavior() {
  return {
    behavior: PLAT_FORM === 'ios' ? 'padding' : 'height',
  };
}

export function isEmptyArray(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}

export function isEmptyString(string) {
  if (!string) return true;
  if (typeof string !== 'string') return true;
  if (string.length === 0) return true;
  return false;
}

export function parseToTwoDigit(value: number): string {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
}

export { defaultFunction };

const pickerOptions = {
  storageOptions: {
    cameraRoll: true,
    path: 'images',
    skipBackup: true,
    waitUntilSaved: true,
  },
  title: 'Select Avatar',
};

export function selectImage(callback) {
  ImagePicker.showImagePicker(pickerOptions, response => {
    if (response.didCancel || response.error) {
      console.log('error at select image');
    } else {
      callback(response);
    }
  });
}

export function getLineCount(value: string) {
  const arr = [...value];
  let lineCount = 0;
  let charCount = 0;
  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];
    if (char === `\n`) {
      lineCount++;
      charCount = 0;
    } else {
      charCount++;
      if (charCount >= 36) {
        lineCount++;
        charCount = 0;
      }
    }
  }
  return lineCount;
}

export function addDistinctArray(
  initialArray: [] = [],
  addedArray: [] = [],
  sort: 'asc' | 'desc' = 'asc',
  duplicateKey = '_id'
) {
  const cloneArray = [...initialArray];
  addedArray.forEach(item => {
    const duplicateIndex = cloneArray.findIndex(
      cloneArr => cloneArr[duplicateKey] === item[duplicateKey]
    );
    if (duplicateIndex === -1) {
      if (sort === 'asc') {
        cloneArray.push(item);
      } else {
        cloneArray.unshift(item);
      }
    } else {
      // update new data from added array
      cloneArray[duplicateIndex] = item;
    }
  });
  return cloneArray;
}
