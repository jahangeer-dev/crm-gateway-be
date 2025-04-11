import Logger from "./logger.js";
class AppLogger {
    private formatMessage(service: string, emoji: string, msg: string) {
      return `${emoji} [${service.toUpperCase()}] ${msg}`;
    }
  
    public info(service: string, msg: string) {
      Logger.info(this.formatMessage(service, '🚀', msg));
    }
  
    public error(service: string, msg: string) {
      Logger.error(this.formatMessage(service, '❌', msg));
    }
  
    public warn(service: string, msg: string) {
      Logger.warn(this.formatMessage(service, '⚠️', msg));
    }
  
    public debug(service: string, msg: string) {
      Logger.debug(this.formatMessage(service, '🐞', msg));
    }
  }
  
export default new AppLogger()