#import "RaceTableCalendar.h"

@implementation RaceTableCalendar

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getCalendarEvents:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve(@[]);
}

@end
