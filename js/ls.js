import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://roxffpgzusrbynuuehwd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJveGZmcGd6dXNyYnludXVlaHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4OTMzMTYsImV4cCI6MjA5ODQ2OTMxNn0.hd1S7IO_BfeQH6fY5bBRrxBQODVETu0FlqwDaVBAwQg"
);

let userId = localStorage.getItem("uid");

if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("uid", userId);
}

async function goOnline() {
  await supabase.from("online_users").upsert({
    id: userId,
    last_seen: Date.now()
  });
}

async function updateCount() {
  const { data } = await supabase
    .from("online_users")
    .select("id");

  document.getElementById("listenerCount").textContent =
    data?.length || 0;
}

window.addEventListener("beforeunload", async () => {
  await supabase.from("online_users").delete().eq("id", userId);
});

async function start() {
  await goOnline();
  await updateCount();

  setInterval(async () => {
    await goOnline();
    await updateCount();
  }, 5000);
}

start();
