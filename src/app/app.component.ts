import { Component } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private androidPermissions: AndroidPermissions) {
    // request Camera permissions on android
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
      .then(
        (result) => console.log('Has permission?', result.hasPermission),
        (err) => {
          console.log(err);
          this.androidPermissions.requestPermission(
            this.androidPermissions.PERMISSION.CAMERA
          );
        }
      );

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const IDWise = (window as any).IDWise;

    IDWise.initialize({
      businessId: 'test-remotepass-journey', // this is the same as journey definition id
      locale: 'en',
    })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((idwise) => {
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
