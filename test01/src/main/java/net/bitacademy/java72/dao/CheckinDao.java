package net.bitacademy.java72.dao;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java72.domain.Checkin;

public interface CheckinDao {
  List<Checkin> list();
  int insertCheckin(Checkin checkin);
  int updateCheckin(Checkin checkin);
  int delete(int mno);
  Checkin get(int attentNo);
  Checkin getCheckin(String memberNo, String thisUrl);
  Checkin exist(HashMap<String, String> map);
  List<Checkin> getTodayInfo(String today);
  List<Checkin> allMember();
  int insertToday(int studentNo);
  int getCheckinTime(HashMap<String, Object> paramMap);
  
}

