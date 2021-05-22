var FCM = require('fcm-node');
function notification_firebase() {
    this.Notification = (msg) => {
        return new Promise((resolve, reject) => {
            var serverkey = process.env.serverKey
            var fcm = new FCM(serverkey);
            fcm.send(msg, (err, resp) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(resp)
                }
            });
        })
    },
        this.NotificationForHelthworker = (msg) => {
            return new Promise((resolve, reject) => {
                var serverkey = process.env.serverKey
                var fcm = new FCM(serverkey);
                fcm.send(msg, (err, resp) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(resp)
                    }
                });
            })
        }
}

module.exports = new notification_firebase()