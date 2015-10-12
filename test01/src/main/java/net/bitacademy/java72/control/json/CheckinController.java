package net.bitacademy.java72.control.json;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.bitacademy.java72.domain.Checkin;
import net.bitacademy.java72.service.CheckinService;

@Controller("json.CheckinController")
@RequestMapping("/bitin/checkin")
public class CheckinController {
  @Autowired CheckinService checkinService;
  @Autowired ServletContext servletContext;
  
  @RequestMapping("/updateMyAttd")
  public Object attendCheckin(Checkin checkin) {
    
    Map<String, Object> checkinResult = new HashMap<String, Object>();
    
    int studentNo = Integer.parseInt(checkin.getThisUrl().substring(
        checkin.getThisUrl().length() - 12).substring(0, 6));
    System.out.println(studentNo);
    
    Calendar calendar = Calendar.getInstance();
    SimpleDateFormat in_time_format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String inTime = in_time_format.format(calendar.getTime());
    String today = inTime.substring(0, 10);
    
    int getCheckinTime = checkinService.getChekinTime(studentNo, today);
    int count;
    
    checkin.setStudentNo(studentNo);
    if (getCheckinTime == 0) {
      if (((Integer.parseInt(inTime.substring(11, 13)) * 60) + 
          Integer.parseInt(inTime.substring(14, 16))) > 550) {
        checkin.setCheckinTime(2);
      } else {
        checkin.setCheckinTime(1);
      }
      checkin.setInTime(inTime);
      checkinResult.put("data", checkin);
      count = checkinService.insertCheckin(checkin);
      
    } else {
      if (((Integer.parseInt(inTime.substring(11, 13)) * 60) + 
          Integer.parseInt(inTime.substring(14, 16))) < 1080) {
        checkin.setCheckoutTime(2);
      } else {
        checkin.setCheckoutTime(1);
      }
      checkin.setOutTime(inTime);
      checkinResult.put("data", checkin);
      count = checkinService.updateCheckin(checkin);
      
    }
    
    //데이터 담기.
    
    System.out.println("카운트 " + count);
    if (count > 0) {
      checkinResult.put("data", "success");
    } else {
      checkinResult.put("data", "failure");
    }

    return checkinResult;
    
  }
  
  @RequestMapping("/getTodayInfo")
  public Object getTodayInfo(String today) {
    
    Map<String, Object> todayInfo = new HashMap<String, Object>();
    if (checkinService.getTodayInfo(today).size() == 0) {
      todayInfo.put("data", "null");
    } else {
      todayInfo.put("data", "Not Null");
    }
    
    return todayInfo;
    
  }
  
  @RequestMapping("/allMember")
  public Object allMember() {
    
    Map<String, Object> allMember = new HashMap<String, Object>();
    allMember.put("data", checkinService.allMember());
    
    return allMember;
    
  }
  
  @RequestMapping("/insertToday")
  public Object insert(int studentNo) throws Exception {
      int count = checkinService.insertToday(studentNo);
      
      Map<String,Object> result = new HashMap<String,Object>();
      if (count > 0) {
        result.put("data", "success");
      } else {
        result.put("data", "failure");
      }
      
      return result;
  }
  
}
