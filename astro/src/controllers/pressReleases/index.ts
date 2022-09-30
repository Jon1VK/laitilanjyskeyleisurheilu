import deletePressRelease from './delete';
import updatePressRelease from './update';

const pressReleasesController = {
  update: updatePressRelease,
  delete: deletePressRelease,
};

export default pressReleasesController;
