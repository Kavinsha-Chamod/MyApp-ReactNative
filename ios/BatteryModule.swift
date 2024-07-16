import Foundation
import UIKit

@objc(BatteryModule)
class BatteryModule: NSObject {
    
    @objc func getBatteryLevel(_ callback: @escaping RCTResponseSenderBlock) {
        let device = UIDevice.current
        device.isBatteryMonitoringEnabled = true
        let batteryLevel = device.batteryLevel
        
        callback([batteryLevel * 100])
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
@objc
static func moduleName() -> String {
    return "BatteryModule"
}

@objc
func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialBatteryLevel": UIDevice.current.batteryLevel * 100]
}
