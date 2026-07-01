import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
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
