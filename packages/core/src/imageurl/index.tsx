function getImageUrl(source: string) {
  if (source?.includes('undefined') || !source) {
    return require('../../../assets/src/images/logo.png');
  } else {
    return {
      uri: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${source}`,
    };
  }
}
export { getImageUrl };
