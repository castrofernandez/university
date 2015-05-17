package com.danimeana.eiibus.presentation.interceptor;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class SessionsInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		ServletContext context = session.getServletContext();
		@SuppressWarnings("unchecked")
		List<String> sessions = context.getAttribute("sessions") == null ? new ArrayList<String>()
				: (List<String>) context.getAttribute("sessions");
		if (!sessions.contains(session.getId()))
			sessions.add(session.getId());
		context.setAttribute("sessions", sessions);
		request.setAttribute("sessions", sessions.size());

		request.setAttribute("sessionid", session.getId());
		
		request.setAttribute("code", session.getAttribute("code"));
		
		return true;
	}

}
