import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavParams, Platform } from '@ionic/angular';
import { Employee } from '@app/shared/models';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ToastService } from '@app/shared/services';

@Component({
	selector: 'details-modal',
	templateUrl: './details.modal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsModalComponent implements OnInit {
	employee: Employee;

	// tslint:disable-next-line:max-line-length
	constructor(private modalController: ModalController, private actionSheetController: ActionSheetController, private alertController: AlertController, private toastService: ToastService, private platform: Platform, private camera: Camera, private file: File, private filePath: FilePath, private navParams: NavParams) {
	}

	ngOnInit(): void {
		this.employee = this.navParams.get('employee');
		console.log(this.employee);
	}

	async dismissModal(imgData) {
		await this.modalController.dismiss(imgData);
	}

	async editProfileImage() {
		const actionSheet = await this.actionSheetController.create({
			header: 'Select Image source',
			buttons: [{
				text: 'Load from Library',
				handler: () => {
					this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
				}
			}, {
				text: 'Use Camera',
				handler: () => {
					this.takePicture(this.camera.PictureSourceType.CAMERA);
				}
			}, {
				text: 'Cancel',
				role: 'cancel'
			}]
		});
		await actionSheet.present();
	}

	takePicture(sourceType: PictureSourceType) {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};

		this.camera.getPicture(options).then(imagePath => {
			const txtForImage = `data:image/jpeg;base64,` + imagePath;
			this.dismissModal(txtForImage);
			/*if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
				this.filePath.resolveNativePath(imagePath).then(filePath => {
					const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
					const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
					this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
				});
			} else {
				const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
				const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
				this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
			}*/
		});
	}

	/*copyFileToLocalDir(namePath, currentName, newFileName) {
		this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
			this.updateStoredImages(success.nativeURL);
			this.dismissModal(success.nativeURL);
		}, error => {
			console.log(error);
			this.toastService.show('Error while storing file', 'background-red');
		});
	}*/

	/*createFileName() {
		const d = new Date(),
			n = d.getTime();
		return n + '.jpg';
	}*/
}
