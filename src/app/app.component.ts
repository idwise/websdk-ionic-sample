import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const IDWise = (window as any).IDWise;

    IDWise.initialize({
      businessId: 'test-remotepass-journey', // this is the same as journey definition id
      locale: 'en',
    })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then(idwise => {
        console.log({ idwise });
        idwise.startJourney({
          mount: '#idwise-mount',
          journeyTemplateId: 'test-remotepass-journey', // journey definition id
          userId: 'verify-websdk-test', // An identifier that uniquely idenfies the user carrying out this journey
          eventHandlers: {
            // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
            onFinished(details) {
              alert('Thanks for completing the registration');
            },
          },
        });
      });
  }
}
