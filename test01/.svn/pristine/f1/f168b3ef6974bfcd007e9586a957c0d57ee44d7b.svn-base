package net.bitacademy.java72.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.bitacademy.java72.dao.CheckinDao;
import net.bitacademy.java72.domain.Checkin;
import net.bitacademy.java72.service.CheckinService;

@Service
public class CheckinServiceImpl implements CheckinService {
  @Autowired CheckinDao checkinDao;
  

  @Override
  public List<Checkin> list() {
    return checkinDao.list();
  }

  @Override
  public int insertCheckin(Checkin checkin) {
    return checkinDao.insertCheckin(checkin);
  }

  @Override
  public int updateCheckin(Checkin checkin) {
    return checkinDao.updateCheckin(checkin);
  }
  
  @Override
  public int deleteCheckin(int mno) {
    return checkinDao.delete(mno);
  }


  @Override
  public Checkin get(int attentNo) {
    return checkinDao.get(attentNo);
  }

  @Override
  public Checkin getCheckin(String memberNo, String thisUrl) {
    return checkinDao.getCheckin(memberNo, thisUrl);
  }

  @Override
  public List<Checkin> getTodayInfo(String today) {
    return checkinDao.getTodayInfo(today);
  }

  @Override
  public List<Checkin> allMember() {
    return checkinDao.allMember();
  }

  @Override
  public int insertToday(int studentNo) {
    return checkinDao.insertToday(studentNo);
  }

  @Override
  public int getChekinTime(int studentNo, String today) {
    HashMap<String, Object> paramMap = new HashMap<String, Object>();
    System.out.println(studentNo + "+" + today);
    paramMap.put("studentNo", studentNo);
    paramMap.put("today", today);
    return checkinDao.getCheckinTime(paramMap);
  }

}
