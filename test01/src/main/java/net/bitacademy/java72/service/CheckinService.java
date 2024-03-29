package net.bitacademy.java72.service;

import java.util.List;

import net.bitacademy.java72.domain.Checkin;

public interface CheckinService {
  List<Checkin> list();
  int insertCheckin(Checkin checkin);
  int deleteCheckin(int attendNo);
  int updateCheckin(Checkin checkin);
  Checkin getCheckin(String memberNo, String thisUrl);
  Checkin get(int attentNo);
  List<Checkin> getTodayInfo(String today);
  List<Checkin> allMember();
  int insertToday(int studentNo);
  int getChekinTime(int studentNo, String today);
}
