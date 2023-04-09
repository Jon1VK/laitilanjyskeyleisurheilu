import * as cheerio from "cheerio";
import { z } from "zod";
import { publicProcedure } from "../trpc";

export const fetchCompetitionData = publicProcedure
  .input(z.object({ url: z.string() }))
  .query(async ({ input }) => {
    const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(
      input.url
    )}`;
    const response = await fetch(corsProxyUrl);
    const responseText = await response.text();
    const $ = cheerio.load(responseText);
    const competitionListing = $(".listaus");
    const title = competitionListing
      .find(".hakuotsikko_iso")
      .contents()
      .last()
      .text();
    const location = competitionListing
      .find(".hakuotsikko")
      .contents()
      .last()
      .text();
    const events = competitionListing
      .find('td:contains("Sarjat/Lajit")')
      .next()
      .contents()
      .filter("ul");
    const startDateTime = competitionListing
      .find('td:contains("Sarjat/Lajit")')
      .next()
      .contents()
      .first()
      .text();
    const enrollmentDate = competitionListing
      .find('strong[style="color:red;"]')
      .text();
    const [startDate, _, startTime] = startDateTime.split(" ");
    const [startDay, startMonth] = startDate.split(".");
    return {
      title,
      location,
      description:
        (enrollmentDate
          ? `<p><strong>Ilmoittautuminen ${enrollmentDate}.</strong></p>`
          : "") +
        (events.length
          ? "<h2><strong>Sarjat ja lajit</strong></h2>" +
            $.html(events)
              .replaceAll("ul>", "li>")
              .replaceAll(/<\/?a.*?>/g, "")
          : ""),
      pressDescription:
        (enrollmentDate ? `Ilmoittautuminen ${enrollmentDate}. ` : "") +
        (events.length
          ? `Sarjat ja lajit:${events.text().replaceAll("\n", ", ").slice(1)}.`
          : ""),
      startDay,
      startMonth,
      startTime,
      enrollmentDate,
    };
  });
