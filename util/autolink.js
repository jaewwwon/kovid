const autolink = (text) => {
  const regURL = new RegExp(
    "(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)",
    "gi",
  );
  const result = text.replace(regURL, "<a href='$1://$2' target='_blank'>$1://$2</a>");
  return result;
};

export default autolink;
