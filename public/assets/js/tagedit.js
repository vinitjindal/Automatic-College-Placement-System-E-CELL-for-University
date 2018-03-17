$(document).on('keyup keypress', 'form input[type="text"]', function(e) {
  if(e.which == 13) {
    e.preventDefault();
    return false;
  }
});
$('.projectTag').tagEditor({
    delimiter: ', ', /* space and comma */
    placeholder: 'Enter Project Keywords ...'
});
$('.hobbyTag').tagEditor({
    delimiter: ', ', /* space and comma */
    placeholder: 'Hobby/Interest'
});
$('.skillTag').tagEditor({
  delimiter: ', ', /* space and comma */
  placeholder: 'Skills separated with ',' '
});
$('.test').tagEditor({
  delimiter: ', ', /* space and comma */
  placeholder: 'Skills separated with ',' '
});
