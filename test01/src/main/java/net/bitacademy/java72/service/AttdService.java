package net.bitacademy.java72.service;

import java.util.List;

import net.bitacademy.java72.domain.Attd;

public interface AttdService {
  List<Attd> list(String today); 
  List<Attd> get(int memNo);
  Object getToday();
}
