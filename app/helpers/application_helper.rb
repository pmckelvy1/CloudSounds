module ApplicationHelper
  def auth_token
    <<-HTML.html_safe
    <input type="hidden" name="authenticity_token" value="#{form_authenticity_token}">
    HTML
  end

  def show_errors
    flash[:errors].join('<br>').html_safe if flash[:errors]
  end

end
