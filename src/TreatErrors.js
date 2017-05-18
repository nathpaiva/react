import PubSub from 'pubsub-js';

class TreatErrors {
  pubError(errs) {
    console.log('errs', errs);
    for (var i = 0; i < errs.length; i++) {
      var err = errs[i];
      PubSub.publish("error-validation", err);
    }
  }
}

export default TreatErrors;
