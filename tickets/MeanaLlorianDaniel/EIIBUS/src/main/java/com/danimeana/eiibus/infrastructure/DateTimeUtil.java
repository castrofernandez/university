package com.danimeana.eiibus.infrastructure;

import java.util.Calendar;
import java.util.Date;

import com.danimeana.eiibus.model.ScheduleDay;

public class DateTimeUtil {

	public static ScheduleDay getDayFromDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
		switch (dayOfWeek) {
		case Calendar.MONDAY:
			return ScheduleDay.MONDAY;
		case Calendar.TUESDAY:
			return ScheduleDay.TUESDAY;
		case Calendar.WEDNESDAY:
			return ScheduleDay.WEDNESDAY;
		case Calendar.THURSDAY:
			return ScheduleDay.THURSDAY;
		case Calendar.FRIDAY:
			return ScheduleDay.FRIDAY;
		case Calendar.SATURDAY:
			return ScheduleDay.SATURDAY;
		case Calendar.SUNDAY:
			return ScheduleDay.SUNDAY;
		default:
			return null;
		}
	}

	public static Date getDateFromString(String date) {
		String[] departureDateSplits = date.split("/");
		int day = Integer.parseInt(departureDateSplits[0]);
		int month = Integer.parseInt(departureDateSplits[1]);
		int year = Integer.parseInt(departureDateSplits[2]);
		Calendar calendar = Calendar.getInstance();
		calendar.clear();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.DATE, day);
		return calendar.getTime();
	}

	public static Date today() {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(System.currentTimeMillis());
		int day = calendar.get(Calendar.DATE);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);
		calendar.clear();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month);
		calendar.set(Calendar.DATE, day);
		return calendar.getTime();
	}

	public static String getStringFromDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		int day = calendar.get(Calendar.DATE);
		return numberToString(day) + "/" + numberToString(month) + "/" + year;
	}

	private static String numberToString(int number) {
		return number < 10 ? "0" + number : "" + number;
	}

	public static String now() {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(System.currentTimeMillis());
		int hour = calendar.get(Calendar.HOUR_OF_DAY);
		int minutes = calendar.get(Calendar.MINUTE);
		return numberToString(hour) + ":" + numberToString(minutes);
	}

	public static int minutesBeetwenTimesSring(String time1, String time2) {
		String[] time1splits = time1.split(":");
		int hoursTime1 = Integer.parseInt(time1splits[0]);
		int minutesTime1 = Integer.parseInt(time1splits[1]);

		String[] time2splits = time2.split(":");
		int hoursTime2 = Integer.parseInt(time2splits[0]);
		int minutesTime2 = Integer.parseInt(time2splits[1]);

		minutesTime1 = hoursTime1 * 60 + minutesTime1;
		minutesTime2 = hoursTime2 * 60 + minutesTime2;

		return minutesTime1 - minutesTime2;
	}

	public static String timePlusMinutesStr(String dateStr, int minutesToPlus) {
		String[] dateSplit = dateStr.split(":");
		int hours = Integer.parseInt(dateSplit[0]);
		int minutes = Integer.parseInt(dateSplit[1]);
		minutes += minutesToPlus;
		if (minutes > 59) {
			hours += minutes / 60;
			minutes = minutes % 60;
		}
		return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
	}

}
